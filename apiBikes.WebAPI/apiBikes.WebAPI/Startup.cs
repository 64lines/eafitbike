using System;
using apiBikes.WebAPI.Tools;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using apiBikes.WebAPI.Configuration;
using MassTransit;
using apiBikes.WebAPI.Consumers;
using GreenPipes;
using Microsoft.OpenApi.Models;
using System.Reflection;
using System.IO;

namespace apiBikes.WebAPI.Services
{
    public class Startup
    {
        readonly string MiCors = "MiCors";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<DatabaseConfiguration>(Configuration.GetSection("DatabaseConfiguration"));
            services.AddScoped<BikeService>();

            services.AddCors(options =>
            {
                options.AddPolicy(name: MiCors,
                                    builder =>
                                    {
                                        builder.WithHeaders("*");
                                        builder.WithOrigins("*");
                                        builder.WithMethods("*");
                                    });
            });

            services.AddMassTransit(x =>
            {
                x.AddConsumer<BikeConsumer>();
                x.AddBus(provider => Bus.Factory.CreateUsingRabbitMq(cfg =>
                {
                    //cfg.UseHealthCheck(provider);
                    cfg.Host(new Uri(Configuration["MessagaBrokerConfiguration:UriHost"]), h =>
                    {
                        h.Username(Configuration["MessagaBrokerConfiguration:Username"]);
                        h.Password(Configuration["MessagaBrokerConfiguration:Password"]);
                    });
                    cfg.ReceiveEndpoint(Configuration["MessagaBrokerConfiguration:ReceiveEndpoint"], ep =>
                    {
                        ep.PrefetchCount = 16;
                        ep.UseMessageRetry(r => r.Interval(2, 100));
                        ep.ConfigureConsumer<BikeConsumer>(provider);
                    });
                }));
            });
            services.AddMassTransitHostedService();

            services.AddControllers()
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.Converters.Add(new IntToStringConverter());
                    options.JsonSerializerOptions.Converters.Add(new DecimalToStringConverter());
                });

            //Documentación
            // Register the Swagger generator, defining 1 or more Swagger documents
            services.AddSwaggerGen(c => {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "apiBikes Documentación",
                    Version = "v1",
                    Description = "API REST para el microservicio que maneja el CRUD de bicicletas ",
                    Contact = new OpenApiContact()
                    {
                        Name = "Santiago Alvarez M",
                        Email = "salvarezm1@eafit.edu.co"
                    }

                });
                // Set the comments path for the Swagger JSON and UI.
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);
            });
        }


        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();


            //DOCUMENTACIÓN
            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("v1/swagger.json", "apiBikes V1");
            });

            app.UseCors(MiCors);

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
