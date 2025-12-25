using DevHabit.Api.Entities;

namespace DevHabit.Api.Dtos.Habits;

public sealed record UpdateHabitDto
{
    public required string Name { get; init; }

    public string? Description { get; init; }

    public required HabitType Type { get; init; }

    public required FrequencyDto Frequency { get; init; }

    public required TargetDto Target { get; init; }

    public required DateOnly? EndDate { get; init; }

    public MilestoneDto? Milestone { get; init; }

    public ICollection<string> TagIds { get; init; } = [];
}

public sealed record UpdateMilestoneDto
{
    public required int Target { get; init; }
}