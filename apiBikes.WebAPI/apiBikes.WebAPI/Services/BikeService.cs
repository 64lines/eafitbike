using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;
using apiBikes.WebAPI.Configuration;
using apiBikes.WebAPI.Models;

namespace apiBikes.WebAPI.Services
{
    public class BikeService
    {
        private readonly IMongoCollection<Bike> _bike;
        private readonly DatabaseConfiguration _settings;

        public BikeService(IOptions<DatabaseConfiguration> settings)
        {
            _settings = settings.Value;
            var client = new MongoClient(_settings.ConnectionString);
            var database = client.GetDatabase(_settings.DatabaseName);
            _bike = database.GetCollection<Bike>(_settings.CustomerCollectionName);
        }

        public async Task<List<Bike>> GetAllAsync()
        {
            return await _bike.Find(c => true).ToListAsync();
        }

        public async Task<Bike> GetByIdAsync(string id)
        {
            return await _bike.Find<Bike>(c => c.Id == id).FirstOrDefaultAsync();
        }

        public async Task<Bike> CreateAsync(Bike bike)
        {
            bike.IsActive = true;
            await _bike.InsertOneAsync(bike);
            return bike;
        }

        public async Task UpdateAsync(string id, Bike bike)
        {
            bike.Id = id;
            await _bike.ReplaceOneAsync(c => c.Id == id, bike);
        }

        public async Task DeleteAsync(string id)
        {
            await _bike.DeleteOneAsync(c => c.Id == id);
        }

    }
}
