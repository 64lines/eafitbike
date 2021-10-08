using apiReservations.WebAPI.Domain.Models;
using apiReservations.WebAPI.Infrastructure.Context;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace apiReservations.WebAPI.Application.Features.ReservationFeatures.Commands
{
    public class CreateReservationCommand : IRequest<int>
    {
        public string User { get; set; }
        public string IdBike { get; set; }
        public class CreateReservationCommandHandler : IRequestHandler<CreateReservationCommand, int>
        {
            private readonly IApplicationContext _context;
            public CreateReservationCommandHandler(IApplicationContext context)
            {
                _context = context;
            }
            public async Task<int> Handle(CreateReservationCommand command, CancellationToken cancellationToken)
            {
                var reservation = new Reservation();
                reservation.IdBike = command.IdBike;
                reservation.User = command.User;
                reservation.StartDate = DateTime.Now;
                _context.Reservations.Add(reservation);
                await _context.SaveChangesAsync();
                return reservation.Id;
            }
        }
    }
}
