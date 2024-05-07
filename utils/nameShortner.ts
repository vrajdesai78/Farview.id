export default function ShortenName(fullName: string, length: number): string {
    if (fullName && fullName.length > length) {
        return fullName.substring(0, length) + '...';
    } else {
        return fullName;
    }
}
