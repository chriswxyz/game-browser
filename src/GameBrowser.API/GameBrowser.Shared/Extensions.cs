using System;
using System.Collections.Generic;
using System.Linq;

namespace GameBrowser.Shared
{
    public static class Extensions
    {
        public static string StringJoin(this IEnumerable<object> arr, string separator) => string.Join(separator, arr);
        public static bool IsNullOrWhiteSpace(this string str) => string.IsNullOrWhiteSpace(str);
    }
}
