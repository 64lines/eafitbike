using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace apiReservations.WebAPI.Configuration
{
    public class MessageBrokerConfiguration
    {
        public string Uri { get; set; }
        public string UriHost { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string ReceiveEndpoint { get; set; }

    }
}
