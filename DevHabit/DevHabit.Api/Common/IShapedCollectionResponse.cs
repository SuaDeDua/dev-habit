using System.Dynamic;

namespace DevHabit.Api.Common;

public interface IShapedCollectionResponse
{
    ICollection<ExpandoObject> Data { get; init; }
}
