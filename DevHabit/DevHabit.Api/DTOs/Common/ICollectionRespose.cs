namespace DevHabit.Api.DTOs.Common;

public interface ICollectionRespose<T>
{
    List<T> Items { get; init; }
}
