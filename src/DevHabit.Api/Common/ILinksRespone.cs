using DevHabit.Api.Dtos.Common;

namespace DevHabit.Api.Common;

public interface ILinksRespose
{
    List<LinkDto> Links { get; init; }
}