using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace apiGeolocation.WebAPI.Configuration
{
    public class DatabaseConfiguration
    {
        public string CustomerCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }
}
