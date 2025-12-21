using System.Dynamic;

namespace DevHabit.Api.Common.DataShaping;

interface IShapedCollectionResponse
{
    IReadOnlyCollection<ExpandoObject> Data { get; init; }
}