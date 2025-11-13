namespace DevHabit.Api.DTOs.HabitTags;

public sealed class UpsertHabitTagsDto
{
    public required List<string> TagIds { get; init; }
}
