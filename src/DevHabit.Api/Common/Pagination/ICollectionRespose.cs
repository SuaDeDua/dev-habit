namespace DevHabit.Api.Common.Pagination;

interface ICollectionRespose<T>
{
    IReadOnlyCollection<T> Data { get; init; }
}