using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace apiReservations.WebAPI.Domain.Models
{

    public class BikeUpdate
    {
        public string IdBike { get; set; }
        public bool IsActive { get; set; }
    }
}
