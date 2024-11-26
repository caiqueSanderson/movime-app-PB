
export function calculateStats(moviesData) {
    let totalMinutes = 0;
    let genreCount = {};

    moviesData.forEach((movie) => {
        totalMinutes += movie.runtime || 0;

        movie.genre_ids.forEach((genreId) => {
            genreCount[genreId] = (genreCount[genreId] || 0) + 1;
            console.log(genreCount)
        });
    });

    const totalHours = totalMinutes / 60;

    const sortedGenres = Object.entries(genreCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([genreId, count]) => ({ genreId, count }));

    console.log(sortedGenres)

    return { totalHours: totalHours.toFixed(2), topGenres: sortedGenres };
};
