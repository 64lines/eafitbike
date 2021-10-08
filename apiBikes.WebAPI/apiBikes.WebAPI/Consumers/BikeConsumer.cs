using apiReservations.WebAPI.Domain.Models;
using MassTransit;
using System.Threading.Tasks;
using apiBikes.WebAPI.Models;
using apiBikes.WebAPI.Services;

namespace apiBikes.WebAPI.Consumers
{
    public class BikeConsumer : IConsumer<BikeUpdate>
    {
        private readonly BikeService _bikeService;

        public BikeConsumer(BikeService customerService)
        {
            _bikeService = customerService;
        }

        public async Task Consume(ConsumeContext<BikeUpdate> context)
        {
            var data = context.Message;

            Bike bike;
            bike =await _bikeService.GetByIdAsync(data.IdBike);
            bike.IsActive = data.IsActive;
            var result =  _bikeService.UpdateAsync(data.IdBike, bike);

        }
    }
}

