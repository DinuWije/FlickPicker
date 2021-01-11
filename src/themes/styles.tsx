import { colors } from "./colors";
import { StyleSheet } from "react-native";

export const appStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
  },
  subContainer: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
  },
  moviesSubContainer: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
  },
  searchArea: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: "20px",
    marginStart: "20px",
  },
  addMoviesArea: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: "20px",
    marginStart: "0px",
  },
  linkText: {
    flex: 1,
    fontSize: 18,
    marginBottom: 20,
    marginTop: 20,
    textAlign: "center",
    color: colors.linkColor,
  },
});

export const titleStyles = StyleSheet.create({
  titleText: {
    fontSize: 35,
    marginStart: 20,
    marginTop: 20,
  },
  mediumText: {
    fontSize: 20,
    marginStart: 20,
    marginTop: 10,
  },
});

export const searchStyles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    minWidth: 540,
  },
  mainText: {
    fontSize: 20,
    marginTop: 20,
    marginStart: 20,
  },
  searchbar: {
    alignContent: "center",
    minWidth: 500,
    maxWidth: 500,
    marginTop: 20,
    marginStart: 20,
    marginBottom: 20,
  },
  listItem: {
    maxWidth: 500,
    minWidth: 500,
    marginStart: 20,
    borderWidth: 0.25,
    borderColor: colors.listItemBorder,
    borderRadius: 6,
    marginTop: 2,
    marginBottom: 2,
    backgroundColor: colors.listItemBackground,
  },
  movieButton: {
    maxHeight: 10,
    justifyContent: "center",
    marginTop: 20,
    minWidth: 100,
    borderRadius: 6,
  },
});

export const addMovieStyles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    minWidth: 540,
    maxWidth: 540,
    minHeight: 90,
  },
  mainText: {
    fontSize: 20,
    marginTop: 20,
    marginStart: 20,
  },
  progressBar: {
    alignContent: "center",
    minWidth: 500,
    maxWidth: 500,
    minHeight: 10,
    marginTop: 20,
    marginStart: 20,
    borderRadius: 5,
  },
  listItem: {
    maxWidth: 500,
    minWidth: 500,
    marginStart: 20,
    borderWidth: 0.25,
    borderColor: colors.listItemBorder,
    borderRadius: 6,
    marginTop: 2,
    marginBottom: 2,
    backgroundColor: colors.listItemBackground,
  },
  movieButton: {
    maxHeight: 10,
    justifyContent: "center",
    marginTop: 20,
    minWidth: 100,
    borderRadius: 6,
  },
  maxCard: {
    backgroundColor: colors.listItemBackground,
  },
  maxText: {
    fontSize: 17,
    marginTop: 5,
    marginBottom: 5,
    textAlign: "center",
  },
});

export const shareStyles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    minWidth: 540,
    maxWidth: 540,
    minHeight: 90,
  },
  mainText: {
    fontSize: 20,
    marginTop: 20,
    marginStart: 20,
  },
  wipText: {
    fontSize: 15,
    marginStart: 20,
  },
});
