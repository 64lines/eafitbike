using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace apiBikes.WebAPI.Models
{
    public class Bike
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; }
        public string Mark { get; set; }    
        public bool IsActive { get; set; }
        public string Description { get; set; }
        public decimal CoordinateX { get; set; }
        public decimal CoordinateY { get; set; }

    }
}
