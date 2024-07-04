import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CategoryType } from "../category/CategoryApi";
import { SortingType } from "../../screens/loggedInStack/homeTabs/SearchProductGridScreen";

import {
  SmartClimate,
  SmartKitchen,
  SmartLaundary,
  SmartLighting,
  SmartSecurity,
  SubCategory,
} from "../products/HomeProductSlice";
import { SearchQueryType } from "../searchProductResults/SearchResultsApi";

type Filter<T extends string> = {
  [K in T]: boolean;
};

type LightingFilters = Filter<SmartLighting>;
type SecurityFilters = Filter<SmartSecurity>;
type ClimateFilters = Filter<SmartClimate>;
type KitchenFilters = Filter<SmartKitchen>;
type LaundryFilters = Filter<SmartLaundary>;

export type Filters = {
  Lighting: LightingFilters;
  Security: SecurityFilters;
  Climate: ClimateFilters;
  Kitchen: KitchenFilters;
  Laundry: LaundryFilters;
};

type SearchProductState = {
  searchHistory: string[];
  filters: Filters;
  sorting: SortingType;
  searchQueryObject: SearchQueryType;
};

type CategoryKeys = keyof Filters;

// Define a type that represents the valid subcategories for each category
type SubCategoryKeys<C extends CategoryKeys> = keyof Filters[C];

export type SubCategoryType = SubCategoryKeys<CategoryKeys>;

export const initialFilters: Filters = {
  Lighting: {
    "Smart Bulb": false,
    "Smart Light Strip": false,
    "Smart Light Switch": false,
    "Smart Lamp": false,
  },
  Security: {
    "Smart Camera": false,
    "Smart Doorbell": false,
    "Smart Lock": false,
    "Smart Alarm": false,
  },
  Climate: {
    "Smart Thermostat": false,
    "Smart Humidifier": false,
    "Smart Dehumidifier": false,
  },
  Kitchen: {
    "Smart Fridge": false,
    "Smart Oven": false,
    "Smart Cooktop": false,
    "Smart Microwave": false,
  },
  Laundry: {
    "Smart Washer": false,
    "Smart Dryer": false,
    "Smart Iron": false,
  },
};

export const DefaultInitialFilters: Filters = {
  Lighting: {
    "Smart Bulb": false,
    "Smart Light Strip": false,
    "Smart Light Switch": false,
    "Smart Lamp": false,
  },
  Security: {
    "Smart Camera": false,
    "Smart Doorbell": false,
    "Smart Lock": false,
    "Smart Alarm": false,
  },
  Climate: {
    "Smart Thermostat": false,
    "Smart Humidifier": false,
    "Smart Dehumidifier": false,
  },
  Kitchen: {
    "Smart Fridge": false,
    "Smart Oven": false,
    "Smart Cooktop": false,
    "Smart Microwave": false,
  },
  Laundry: {
    "Smart Washer": false,
    "Smart Dryer": false,
    "Smart Iron": false,
  },
};

const initialSearchQueryObject: SearchQueryType = {
  searchQuery: "Bulb",
  filters: {
    SubCategory: [],
  },
  priceRange: {
    min: 10,
    max: 2000,
  },
};

const sorting: SortingType = "none";

const initialState: SearchProductState = {
  searchHistory: ["Smart Watch", "Camera"],
  filters: initialFilters,
  sorting: sorting,
  searchQueryObject: initialSearchQueryObject,
};

const SearchProductSlice = createSlice({
  name: "searchProduct",
  initialState: initialState,
  reducers: {
    updateSearchHistory: (state, action: PayloadAction<string>) => {
      if (state.searchHistory.length > 5) {
        state.searchHistory.pop();
      }
      if (!state.searchHistory.includes(action.payload)) {
        state.searchHistory.unshift(action.payload);
      }
    },
    clearSearchHistory: (state) => {
      state.searchHistory = [];
    },
    clearFilters: (state) => {
      state.filters = initialFilters;
    },
    applyFilter: (
      state,
      action: {
        payload: {
          category: CategoryKeys;
          subCategory: SubCategoryType;
        };
      }
    ) => {
      const { category, subCategory } = action.payload;

      let updatedSubFilter: Filters;

      if (subCategory === "") {
        updatedSubFilter = {
          ...state.filters,
          [category]: {
            ...DefaultInitialFilters[category],
          },
        };
      } else {
        updatedSubFilter = {
          ...state.filters,
          [category]: {
            ...DefaultInitialFilters[category],
            [subCategory]: true,
          },
        };
      }

      state.filters = updatedSubFilter;

      // Clearing Sorting when filter applied
      state.sorting = "none";
    },

    applySorting: (state, action: PayloadAction<SortingType>) => {
      state.sorting = action.payload;
    },

    setSearchQueryObject: (state, action: PayloadAction<SearchQueryType>) => {
      console.log(action.payload);
      state.searchQueryObject = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQueryObject.searchQuery = action.payload;
    },
    resetSearchStates: (state) => {
      state.searchQueryObject = initialSearchQueryObject;
      state.sorting = "none";
      state.filters = DefaultInitialFilters;
    },
  },
});

export const {
  updateSearchHistory,
  clearSearchHistory,
  applyFilter,
  applySorting,
  setSearchQueryObject,
  setSearchQuery,
  resetSearchStates,
} = SearchProductSlice.actions;
export default SearchProductSlice.reducer;
