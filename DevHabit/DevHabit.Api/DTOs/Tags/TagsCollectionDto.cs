using DevHabit.Api.DTOs.Common;

namespace DevHabit.Api.DTOs.Tags;

public sealed record TagsCollectionDto : ICollectionRespose<TagDto>
{
    public List<TagDto> Items { get; init; }
}
