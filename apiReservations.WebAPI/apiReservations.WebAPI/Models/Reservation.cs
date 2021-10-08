using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace apiReservations.WebAPI.Domain.Models
{
    public class Reservation
    {
        public int Id { get; set; }
        public string User { get; set; }
        public string IdBike { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}
