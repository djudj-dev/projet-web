// Fonction pour formater une chaîne de date au format "jour-mois-année"
function dateFormat(dateString) {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
    return formattedDate;
}

export default dateFormat;
