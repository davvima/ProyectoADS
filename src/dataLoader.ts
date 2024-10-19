export const loadData = (key: string) => {
  switch (key) {
    case "dashboardData":
      return import("./data/dashboardData.json")
    default:
      throw new Error("No data found for the specified key")
  }
}
