export default function transformDate (dateString: string): string {
    console.log('This is dateString: ', dateString)
    const dateInput = new Date(dateString)
    console.log('This is dateInput: ', dateInput)

    const transformedDate = dateInput.toLocaleString('es-AR', { // TODO: Adapt to the local timedate
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        // second: '2-digit'
    })

    return transformedDate
}