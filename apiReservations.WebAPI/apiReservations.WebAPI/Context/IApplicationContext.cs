using apiReservations.WebAPI.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace apiReservations.WebAPI.Infrastructure.Context
{
    public interface IApplicationContext
    {
        DbSet<Reservation> Reservations { get; set; }

        Task<int> SaveChangesAsync();
    }
}