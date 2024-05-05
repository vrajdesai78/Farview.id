export const getFormattedTime = (date: string) => {
    const dateObj = new Date(date);

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    };

    const formattedDate = dateObj.toLocaleString('en-US', options);

    const [monthAndDay, yearAndTime, hour, minute] = formattedDate.split(", ");

    const finalFormattedDate = `${hour} ${monthAndDay}, ${yearAndTime}`;

    return finalFormattedDate;
}
