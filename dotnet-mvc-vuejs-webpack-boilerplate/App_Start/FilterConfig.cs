using System.Web;
using System.Web.Mvc;

namespace dotnet_mvc_vuejs_webpack_boilerplate
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
