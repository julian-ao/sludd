# Project 1 - Sludd

## How to run the website

From the root of the project, run

1. *pnpm i*
2. *pnpm dev*

## Documentation

### About the project

This project is a weather website where the user can search up any place they wishes in Norway, regardless of if its a county, city, street or even a farm. The website will then display the weather for the wished location for the next 24 hours. The user can filter places based on what type of place it is, and the user can store a location as a favourite to make it easier to find the weather information for that place later.

### Navigation between resources

When a user is presented with multiple locations, they have the option to be presented with an individual location by clicking on it. Before the user clicks into an individual location's page, they can access brief real-time weather information. Upon clicking, a full-screen view of the selected location is displayed, incorporating weather information for every hour over the forthcoming 24 hours. For a more comprehensive weather report, users need to click into the page to access detailed weather information. Users can seamlessly navigate between an individual location's page and the previous view by utilizing a dedicated back button, in addition to navigating back to the home page by clicking on the logo at the top of the page.

### Filtering

In our project, we have implemented two distinct filtering mechanisms. The first entails a straightforward location name search, while the second involves a filtering button on the search page that categorizes locations by type. The search function employs fuzzy search algorithms to retrieve locations with names that closely approximate the user's input.

### Favourites

A user has the capability to designate a specific location as a favorite by clicking the heart-shaped icon on the respective location's page. Following this action, the user gains the ability to retrieve a colleciton of their favorited locations directly from the homepage, which optimizes access for convenience.

### Usage of React State and Props

**Description:**

React state is used to manage dynamic data and user interactions. Props are employed to pass data between components.

**Examples:**

- The *LocationCard* component receives *locationData* as a prop. This data provides the component with the necessary information about a location, which it then uses to display relevant details and fetch weather data.

    ``` html
    <LocationCard locationData={someLocationData} />
    ```

- The *HomePage* component uses the useState hook to manage its own local state. Two pieces of state are maintained:
  - *greeting*: Determines the greeting message based on the time of day.
  - *favoriteLocations*: Stores an array of user's favorite locations.

    ``` javascript
    const [greeting, setGreeting] = useState('');
    const [favoriteLocations, setFavoriteLocations] = useState([]);

    const getGreeting = () => {
        ...
        setGreeting(greetings[greetingIndex]);
    };

    useEffect(() => {
        getGreeting();
        const favoriteLocations = localStorage.getItem('favorites');
        favoriteLocations && setFavoriteLocations(JSON.parse(favoriteLocations));
    }, []);
    ```

### REST API and TanStack Query

**Description:**
We fetch data from two different REST APIs using TanStack Query to ensure efficient data retrieval and caching.

**Examples:**

- *SearchPage* component:
  - Purpose: This component allows users to search for specific locations.
  - Data Fetching: It uses a search parameter (from the URL) to retrieve location data from `ws.geonorge.no`.
  - Example usage:

   ``` typescript
    const { data, isLoading, refetch } = useQuery<LocationQueryData>({
        queryKey: ["locationData", searchTerm],
        queryFn: () => fetch(`https://ws.geonorge.no/stedsnavn/v1/sted?sok=${searchTerm}${filterString}&fuzzy=true&...`
        ...
    });
   ```

- *useLocationWeatherQuery* custom hook:
  - Purpose: This hook is designed to fetch both location and weather data based on either a location name or a location ID.
  - Data Fetching: Depending on the input (location name), it fetches data first from `ws.geonorge.no` for location coordinate details, and then `api.met.no` for weather details.
  - Example usage:

   ``` typescript
   const { locationData, weatherQuery } = useLocationWeatherQuery({ locationName: locationName, locationId: locationId });
   ```

By utilizing TanStack Query, these components and hooks efficiently fetch, cache, and update data, ensuring a smooth user experience.

### HTML Web Storage API

**Description**:
We leverage the HTML Web Storage API, specifically localStorage and sessionStorage, to persistently store user preferences and other essential information across sessions and to temporarily store data for the duration of a page session, respectively.

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

By utilizing the HTML Web Storage API, we can enhance the user experience by remembering their preferences and actions, making the application more intuitive and user-friendly.

### React Router

**Description:**
React Router is employed to manage navigation and routing within the application. This allows us to display different components based on the URL path, providing a seamless user experience without reloading the page.

**Implementation:**

- Home Page (/): When users visit the root URL, they are presented with the HomePage component.
- Search Page (/search): Users can navigate to the search page to perform searches, which displays the SearchPage component.
- Location Information Page (/location/:locationName/:slug?): This route is used to display detailed information about a specific location based on locationName. The optional slug parameter can be used for further specification or filtering, displaying the LocationPage component.
- Not Found Page (*): If users navigate to a URL not defined in our routes, they are presented with the NotFoundPage component, where they can easily navigate back to the home page.

```html
<Routes>
   <Route path="/" element={<HomePage />} />
   <Route path="/search" element={<SearchPage />} />
   <Route path="/location/:locationName/:slug?" element={<LocationPage />} />
   <Route path="*" element={<NotFoundPage />} />
</Routes>
```

### Responsive Design

**Description:**
The project is designed to be responsive and functions well on both desktop and mobile devices.

**Techniques:**

- We use media queries to adjust styles for different screen widths. For instance, the `.location_content` class has different styles for devices with widths up to 1250px and 500px. Similarly, the `.searchContainer` class adjusts its width based on whether the device width is 600px or between 601px and 1024px.
- Classes like `.location_header`, `.location_header_top`, and `.location_header_info` utilize flexbox to space out their child elements and adjust their layout based on screen size.
- The `.location_main` class uses 100vw for its width, ensuring it spans the full viewport width. The `.location_content` class uses percentages (90%) for its width, ensuring it takes up a relative portion of its container.
- The `.location_content` class has a max-width of 1000px, ensuring that on larger screens, the content doesn't stretch too wide.
- The `.hidden_column` class is set to display: none for devices with a width up to 1250px, ensuring that certain columns are hidden for a cleaner look on smaller screens.

## Testing

### How to run tests

`pnpm test`

### What has been tested

**Demonstrating Snapshot Testing:**
For several components, such as HeartButton, WeatherIcon, Popup, LocationCard, FilterSkeleton, and SearchBar, snapshot testing has been performed. This method ensures that the user interface does not change unexpectedly. By using;

```ts
expect(container).toMatchSnapshot();
```

the current rendering of the component is compared to a previously stored "snapshot" to identify any changes.

**Testing Custom Components:**

- Testing based on props and state: For instance, in the HeartButton and FilterSkeleton tests, the components are rendered with different props to ensure they behave as expected.

- User Interaction: In the FilterSkeleton test, there's a test that simulates a user click to check that the filter dropdown is displayed upon interaction.

**Use of Mocking to Prevent Data Fetching:**

To avoid actual data fetches during testing, mocking has been employed. This can be seen in the LocationCard and SearchBar tests where the `@tanstack/react-query` module is mocked to return predetermined data.

**Testing on Mainstream Browsers and Mobile Devices:**

The team has tested the application on different mobile devices that the team has access to. This ensures that the application functions as expected across devices and device-screens.

## Commit message template

We used the following commit message template for all commits when contributing to the project.

`<type>`: `<title>`

Explain how the commit addresses the issue

**Co-authored-by:** `<name> <email>`

**Issue:** `#<issueNr>`

--- COMMIT END ---

The `<type>` can be one of the following:

- `feat`     (new feature)
- `fix`      (bug fix)
- `refactor` (refactoring production code)
- `style`    (formatting, missing semicolons, etc; no code change)
- `docs`     (changes to documentation)
- `test`     (adding or refactoring tests; no production code change)
- `chore`    (updating grunt tasks, etc; no production code change)
