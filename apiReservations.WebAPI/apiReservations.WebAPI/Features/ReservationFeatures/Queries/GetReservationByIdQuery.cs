using apiReservations.WebAPI.Domain.Models;
using apiReservations.WebAPI.Infrastructure.Context;
using MediatR;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace apiReservations.WebAPI.Infrastructure.Features.ReservationFeatures.Queries
{
    public class GetReservationByIdQuery : IRequest<Reservation>
    {
        public int Id { get; set; }
        public class GetReservationByIdQueryHandler : IRequestHandler<GetReservationByIdQuery, Reservation>
        {
            private readonly IApplicationContext _context;
            public GetReservationByIdQueryHandler(IApplicationContext context)
            {
                _context = context;
            }
            public async Task<Reservation> Handle(GetReservationByIdQuery query, CancellationToken cancellationToken)
            {
                var product = _context.Reservations.Where(a => a.Id == query.Id).FirstOrDefault();
                if (product == null) return null;
                return product;
            }
        }
    }
}
