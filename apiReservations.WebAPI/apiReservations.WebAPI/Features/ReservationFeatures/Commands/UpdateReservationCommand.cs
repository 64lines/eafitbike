using apiReservations.WebAPI.Infrastructure.Context;
using MediatR;
using Microsoft.Extensions.FileSystemGlobbing.Internal.PatternContexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace apiReservations.WebAPI.Features.ReservationFeatures.Commands
{
    public class UpdateReservationCommand : IRequest<int>
    {
        public int Id { get; set; }
        public string User { get; set; }
        public string IdBike { get; set; }
        public class UpdateReservationCommandHandler : IRequestHandler<UpdateReservationCommand, int>
        {
            private readonly IApplicationContext _context;
            public UpdateReservationCommandHandler(IApplicationContext context)
            {
                _context = context;
            }
            public async Task<int> Handle(UpdateReservationCommand command, CancellationToken cancellationToken)
            {
                var reservation = _context.Reservations.Where(a => a.Id == command.Id).FirstOrDefault();

                if (reservation == null)
                {
                    return default;
                }
                else
                {
                    reservation.User = command.User;
                    reservation.IdBike = command.IdBike;
                    reservation.EndDate = DateTime.Now;
                    await _context.SaveChangesAsync();
                    return reservation.Id;
                }
            }
        }
    }
}
