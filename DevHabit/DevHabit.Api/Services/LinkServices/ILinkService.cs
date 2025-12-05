using DevHabit.Api.DTOs.Common;

namespace DevHabit.Api.Services.LinkServices;

public interface ILinkService
{
    LinkDto Create(
            string endpointName,
            string rel,
            string method,
            object? values = null,
            string? controllerName = null);
}
