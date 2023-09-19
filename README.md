## How to run the website:
From the root of the project, run
1. *pnpm i*
2. *pnpm dev*


## Documentation

### About the project
This project is a weather website where the user can search up any place they wishes in Norway, regardless of if its a county, city, street or even a farm. The website will then display the weather for the wished location for the next 24 hours. The user can filter places based on what type of place it is, and the user can store a location as a favourite to make it easier to find the weather information for that place later.

<br><br>
### Usage of React State and Props
**Description:** <br>
React state is used to manage dynamic data and user interactions. Props are employed to pass data between components.
<br>
<br>
**Examples:**
<br>
- The *LocationCard* component receives *locationData* as a prop. This data provides the component with the necessary information about a location, which it then uses to display relevant details and fetch weather data. <br>
``` tsx
<LocationCard locationData={someLocationData} />
```
- The *HomePage* component uses the useState hook to manage its own local state. Two pieces of state are maintained:
   - *greeting*: Determines the greeting message based on the time of day.
   - *favoriteLocations*: Stores an array of user's favorite locations.
      ``` typescript
      const [greeting, setGreeting] = useState('');
      const [favoriteLocations, setFavoriteLocations] = useState([]);
      ```

<br><br>
### REST API and TanStack Query
**Description:** <br>
We fetch data from various APIs using TanStack Query to ensure efficient data retrieval and caching.
<br><br>
**Examples:** <br>
- *SearchPage* component:
   - Purpose: This component allows users to search for specific locations.
   - Data Fetching: It uses a search parameter (from the URL) to retrieve location data from `ws.geonorge.no`.
   - Usage:
   ``` typescript
   const searchTerm = searchParams.get('q') || undefined;
   const { data } = useQuery<LocationQueryData>({ queryKey: ["locationData", searchTerm], ... });
   ```
- *useLocationWeatherQuery* custom hook:
   - Purpose: This hook is designed to fetch both location and weather data based on either a location name or a location ID.
   - Data Fetching: Depending on the input (location name), it fetches data first from `ws.geonorge.no` for location coordinate details, and then `api.met.no` for weather details.
   - Usage:
   ``` typescript
   const { locationData, weatherQuery } = useLocationWeatherQuery({ locationName: "Oslo" });
   ```
<br>
By utilizing TanStack Query, these components and hooks efficiently fetch, cache, and update data, ensuring a smooth user experience.

<br><br>
### HTML Web Storage API
**Description**: <br>
We leverage the HTML Web Storage API, specifically localStorage and sessionStorage, to persistently store user preferences and other essential information across sessions and to temporarily store data for the duration of a page session, respectively.
<br><br>
**Examples**:
- Using localStorage in HomePage:
   - Purpose: The HomePage component uses localStorage to store and retrieve users' favorite locations. This ensures that users' favorite locations persist across browser sessions, providing a personalized experience every time they visit the page.
   - Implementation to retrieve favourite locations:
   ``` ts
   useEffect(() => {
        ...
        const favoriteLocations = localStorage.getItem('favorites');
        favoriteLocations && setFavoriteLocations(JSON.parse(favoriteLocations));
    }, []);
   ```
- Using sessionStorage for Filters:
   - Purpose: sessionStorage is used to temporarily store filter preferences for the duration of a page session. This ensures that users' filter preferences are remembered as they navigate through the site, but these preferences are not persisted across browser sessions.
   - Implementation of retrieving filters:
   ```ts
   const storedFilters = window.sessionStorage.getItem("filters");
   ```
<br>
By utilizing the HTML Web Storage API, we can enhance the user experience by remembering their preferences and actions, making the application more intuitive and user-friendly.


<br><br>
### React Router
**Description:** <br>
React Router is employed to manage navigation and routing within the application. This allows us to display different components based on the URL path, providing a seamless user experience without reloading the page.
<br><br>
**Implementation:**<br>
- Home Page (/): When users visit the root URL, they are presented with the HomePage component.
- Search Page (/search): Users can navigate to the search page to perform searches, which displays the SearchPage component.
- Location Information Page (/location/:locationName/:slug?): This route is used to display detailed information about a specific location based on locationName. The optional slug parameter can be used for further specification or filtering, displaying the LocationPage component.
- Not Found Page (*): If users navigate to a URL not defined in our routes, they are presented with the NotFoundPage component.
```tsx
<Routes>
   <Route path="/" element={<HomePage />} />
   <Route path="/search" element={<SearchPage />} />
   <Route path="/location/:locationName/:slug?" element={<LocationPage />} />
   <Route path="*" element={<NotFoundPage />} />
</Routes>
```

<br><br>
### Responsive Design
**Description:** <br>
The project is designed to be responsive and functions well on both desktop and mobile devices.
<br><br>
**Techniques:** <br>
- We use media queries to adjust styles for different screen widths. For instance, the `.location_content` class has different styles for devices with widths up to 1250px and 500px. Similarly, the `.searchContainer` class adjusts its width based on whether the device width is 600px or between 601px and 1024px.
-  Classes like `.location_header`, `.location_header_top`, and `.location_header_info` utilize flexbox to space out their child elements and adjust their layout based on screen size.
- The `.location_main` class uses 100vw for its width, ensuring it spans the full viewport width. The `.location_content` class uses percentages (90%) for its width, ensuring it takes up a relative portion of its container.
-  The `.location_content` class has a max-width of 1000px, ensuring that on larger screens, the content doesn't stretch too wide.
- The `.hidden_column` class is set to display: none for devices with a width up to 1250px, ensuring that certain columns are hidden for a cleaner look on smaller screens. 

<br><br>
## Testing

### How to run tests: 


### What has been tested:
