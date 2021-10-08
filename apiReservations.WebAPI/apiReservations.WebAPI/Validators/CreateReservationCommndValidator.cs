using apiReservations.WebAPI.Application.Features.ReservationFeatures.Commands;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace apiReservations.WebAPI.Validators
{
public class CreateReservationCommndValidator : AbstractValidator<CreateReservationCommand>
{
    public CreateReservationCommndValidator()
    {
        RuleFor(c => c.IdBike).NotEmpty();
        RuleFor(c => c.User).NotEmpty();
        }
    }
}
