using apiReservations.WebAPI.Application.Features.ReservationFeatures.Commands;
using apiReservations.WebAPI.Application.Features.ReservationFeatures.Queries;
using apiReservations.WebAPI.Configuration;
using apiReservations.WebAPI.Domain.Models;
using apiReservations.WebAPI.Features.ReservationFeatures.Commands;
using apiReservations.WebAPI.Infrastructure.Features.ReservationFeatures.Queries;
using MassTransit;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using System;
using System.Threading.Tasks;

namespace apiReservations.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private IMediator _mediator;
        private readonly MessageBrokerConfiguration _settings;
        private readonly Uri _uri;
        private readonly IBus _bus;

        public ReservationController(IBus bus, IOptions<MessageBrokerConfiguration> settings)
        {
            _bus = bus;
            _settings = settings.Value;
            _uri = new Uri(_settings.Uri);

        }

        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();

        /// <summary>
        /// Creates a new reservation.
        /// </summary>
        /// <param name="command"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Create(CreateReservationCommand command)
        {
            BikeUpdate bikeUpdate = new BikeUpdate
            {
                IdBike = command.IdBike,
                IsActive = false
            };

            var endPoint = await _bus.GetSendEndpoint(_uri);
            await endPoint.Send(bikeUpdate);

            return Ok(await Mediator.Send(command));
 
        }
        /// <summary>
        /// Get all reservations
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await Mediator.Send(new GetAllReservationsQuery()));
        }
        /// <summary>
        /// Getr reservations by Id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            return Ok(await Mediator.Send(new GetReservationByIdQuery { Id = id }));
        }
        /// <summary>
        /// Update the reservation based on Id.   
        /// </summary>
        /// <param name="id"></param>
        /// <param name="command"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdateReservationCommand command)
        {
            if (id != command.Id)
            {
                return BadRequest();
            }

            BikeUpdate bikeUpdate = new BikeUpdate();
            bikeUpdate.IdBike = command.IdBike;
            bikeUpdate.IsActive = true;

            var endPoint = await _bus.GetSendEndpoint(_uri);
            await endPoint.Send(bikeUpdate);
            return Ok(await Mediator.Send(command));
        }
    }
}