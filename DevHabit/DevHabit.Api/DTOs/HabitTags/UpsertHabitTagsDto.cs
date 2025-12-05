namespace DevHabit.Api.DTOs.HabitTags;

public sealed record UpsertHabitTagsDto
{
    public required IReadOnlyCollection<string> TagIds { get; init; }
}
