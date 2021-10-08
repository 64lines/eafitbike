using apiReservations.WebAPI.Domain.Models;
using apiReservations.WebAPI.Infrastructure.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace apiReservations.WebAPI.Application.Features.ReservationFeatures.Queries
{
    public class GetAllReservationsQuery : IRequest<IEnumerable<Reservation>>
    {

        public class GetAllReservationsQueryHandler : IRequestHandler<GetAllReservationsQuery,IEnumerable<Reservation>>
        {
            private readonly IApplicationContext _context;
            public GetAllReservationsQueryHandler(IApplicationContext context)
            {
                _context = context;
            }
            public async Task<IEnumerable<Reservation>> Handle(GetAllReservationsQuery query, CancellationToken cancellationToken)
            {
                var productList = await _context.Reservations.ToListAsync();
                if (productList == null)
                {
                    return null;
                }
                return productList.AsReadOnly();
            }
        }
    }
}
