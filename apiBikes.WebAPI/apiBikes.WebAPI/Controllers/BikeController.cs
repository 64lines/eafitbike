using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using apiBikes.WebAPI.Models;
using apiBikes.WebAPI.Services;

namespace apiBikes.WebAPI.Controllers
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

        /// <summary>
        /// Create a bike
        /// </summary>
        /// <param name="bike"></param>
        /// <returns name="bike"></returns>

        [HttpPost]
        public async Task<IActionResult> Create(Bike bike)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            await _bikeService.CreateAsync(bike);
            return Ok(bike);
        }


        /// <summary>
        /// Update a bike
        /// </summary>
        /// <param name="id"></param>
        /// <param name="customerIn"></param> 
        /// <returns name="bike"></returns>
        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, Bike customerIn)
        {
            var bike = await _bikeService.GetByIdAsync(id);
            if (bike == null)
            {
                return NotFound();
            }
            await _bikeService.UpdateAsync(id, customerIn);
            return Ok(bike);
        }

        /// <summary>
        /// Delete a bike
        /// </summary>
        /// <param name="id"></param>
        /// <returns name="bike"></returns>

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var bike = await _bikeService.GetByIdAsync(id);
            if (bike == null)
            {
                return NotFound();
            }
            await _bikeService.DeleteAsync(bike.Id);
            return Ok(bike);
        }
    }
}