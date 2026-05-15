using Newtonsoft.Json;
using System;
using System.Web;

namespace HotelMaster.Common.CommonMethods
{
    public class CommonMethods
    {

        public static string BuildUrlQueryString(
                            string basePath, Dictionary<string, string> queryParams,  Object obj)
        {

            var json = JsonConvert.SerializeObject(obj);
            var dictionary = JsonConvert.DeserializeObject<Dictionary<string, object>>(json);
            var query = HttpUtility.ParseQueryString(string.Empty);

            foreach (var dict in dictionary)
            {
                if (dict.Value != null)
                {
                    query[dict.Key] =
                        dict.Value.ToString();
                }
            }

            return string.Join("?", basePath, query.ToString());
        }

    }
}
