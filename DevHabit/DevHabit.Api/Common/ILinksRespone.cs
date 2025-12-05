using DevHabit.Api.DTOs.Common;

namespace DevHabit.Api.Common;

public interface ILinksRespose
{
    List<LinkDto> Links { get; init; }
}
