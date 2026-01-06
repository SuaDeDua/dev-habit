namespace DevHabit.Api.Dtos.Auth;

public record class TokenRequestDto(string UserId, string Email, IEnumerable<string> Roles);