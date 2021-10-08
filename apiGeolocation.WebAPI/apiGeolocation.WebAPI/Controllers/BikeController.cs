using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using apiGeolocation.WebAPI.Models;
using apiGeolocation.WebAPI.Services;

namespace apiGeolocation.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BikeController : ControllerBase
    {
        private readonly BikeService _bikeService;

        public BikeController(BikeService customerService)
        {
            _bikeService = customerService;
        }


        /// <summary>
        /// Get all bikes
        /// </summary>
        /// <param></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _bikeService.GetAllAsync());
        }

        /// <summary>
        /// Get a bike
        /// </summary>
        /// <param name="id"></param>
        /// <returns name="bike"></returns>

        [HttpGet("{id:length(24)}")]
        public async Task<IActionResult> Get(string id)
        {
            var bike = await _bikeService.GetByIdAsync(id);
            if (bike == null)
            {
                return NotFound();
            }
            return Ok(bike);
        }
    }
}