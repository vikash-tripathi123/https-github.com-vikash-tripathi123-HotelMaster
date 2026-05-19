using HotelMaster.Models;
using System.Data;

namespace HotelMaster.DataAccess
{
    public interface IDataService
    {
        public Task<T> GetAsync<T>(string url, object? parameter);

        public Task<T> PostAsync<T>(string url, object parameter);

        public Task<T> PutAsync<T>(string url, object parameter);

        public Task<T> DeleteAsync<T>(string url, object parameter);



    }
}
