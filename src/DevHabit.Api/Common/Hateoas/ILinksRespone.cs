using DevHabit.Api.Dtos.Common;

namespace DevHabit.Api.Common.Hateoas;

interface ILinksRespose
{
    IReadOnlyCollection<LinkDto> Links { get; init; }
}