import { setStatusBarTranslucent } from "expo-status-bar";
import * as React from "react";
import { Button, Text, View } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import {
  Searchbar,
  ProgressBar,
  Colors,
  List,
  IconButton,
  Checkbox,
} from "react-native-paper";
import { Item } from "react-native-paper/lib/typescript/components/List/List";

let OMDBkey: string = "346ff3a2";

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface APIResponse {
  Search: Movie[];
  totalResults: string;
  Resposne: string;
}

function getMovies(title: string): Promise<Movie[]> {
  const searchTitle = title.replace(/\s/g, "+");
  let fetchurl: string = `http://www.omdbapi.com/?apikey=${OMDBkey}&s=${searchTitle}`;
  return fetch(fetchurl)
    .then((res) => res.json())
    .then((res) => {
      if (res["Response"] == "True") {
        return res["Search"] as Movie[];
      }
      return [] as Movie[];
    });
}

const Search = () => {
  const [movies, setMovies] = React.useState<Movie[]>([]);
  const [progress, setProgress] = React.useState(0);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [added, setAdded] = React.useState("Add Movie");
  let imdbIDs: Set<string> = new Set();

  const onChangeSearch = (query: any) => {
    // getMovies(query).then((moviesArr) => {
    //   moviesArr = moviesArr.filter((obj) => obj.Type === "movie");
    //   setMovies(moviesArr);
    // });

    setSearchQuery(query);
  };

  const onButtonPress = () => {
    setProgress(progress + 1);
    //comment below
    getMovies(searchQuery).then((moviesArr) => {
      moviesArr = moviesArr.filter((obj) => obj.Type === "movie");
      setMovies(moviesArr);
    });
  };

  const getTitle = (imdb: string): string => {
    console.log(imdb);
    imdbIDs.forEach(function (value) {
      console.log(value);
    });

    if (imdbIDs.has(imdb)) {
      return "Added";
    }
    return "Add Movie";
  };

  const onPressButton = (_: any, imdb: string) => {
    imdbIDs.add(imdb);
    console.log(imdbIDs.size);
  };

  const getDisabled = (imdb: string): boolean => {
    if (imdbIDs.has(imdb)) {
      return true;
    }
    return false;
  };

  return (
    <View>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <Button title="Click ME" onPress={onButtonPress} />
      <ProgressBar progress={progress / 5} color={Colors.red800} />
      <Text>{searchQuery}</Text>
      <View>
        {movies.map((movie) => (
          <List.Item
            title={movie.Title}
            description={movie.Year}
            key={movie.imdbID}
            left={(props) => <List.Icon {...props} icon="folder" />}
            right={(props) => (
              <Button
                {...props}
                title={getTitle(movie.imdbID)}
                onPress={(e: Event) => onPressButton(e, movie.imdbID)}
              />
            )}
          />
          // <IconButton
          //   icon="camera"
          //   color={Colors.red500}
          //   size={20}
          //   onPress={() => console.log("Pressed")}
          // />
        ))}
        {/* <Checkbox.Android status={checked} onPress={onPressCheckbox} /> */}
      </View>
    </View>
  );
};

export default Search;
