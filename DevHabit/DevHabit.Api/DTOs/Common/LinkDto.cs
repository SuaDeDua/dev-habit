namespace DevHabit.Api.DTOs.Common;

public sealed record LinkDto(
    string Href,
    string Rel,
    string Method);
