namespace DevHabit.Api.Common;

public interface ICollectionRespose<T>
{
    ICollection<T> Data { get; init; }
}
