export class StudentTemplate {
  static renderTableRow(move) {
    const tableRow = `
    <tr class="content-row" data-id=${move.id}>
      <td>
        <img src="https://placehold.co/400" alt="avatar student" class="avt-student"/>
      </td>
      <td>${move.Name}</td>
      <td>${move.Email}</td>
      <td>${move.Phone}</td>
      <td>${move.EnrollNumber}</td>
      <td>${move.DateOfAdmission}</td>
      <td>
        <button class="btn-table btn-edit" aria-label="Edit student" data-id=${move.id}>
          <img src="https://placehold.co/400" alt="button edit" />
        </button>
      </td>
      <td>
        <button class="btn-table btn-delete" aria-label="Delete student" data-id=${move.id}>
          <img src="https://placehold.co/400" alt="button delete" />
        </button>
      </td>
    </tr>`

    return tableRow;
  } 
}
