export class StudentTemplate {
  static renderTableThead() {
    const tableThead = `
    <li class="table-thead">
      <span></span>
      <span>Name</span>
      <span>Email</span>
      <span>Phone</span>
      <span>Enroll Number</span>
      <span>Date of admission</span>
      <span></span>
      <span></span>
    </li>
  `

  return tableThead;
  }

  // Display table rows when data is passed in
  static renderTableRow(move) {
    const tableRow = `
      <li class="table-row" data-id=${move.id}>
        <span><img src="/avatar.7bb99cdb.svg" alt="avatar student" class="avt-student"></span>
        <span>${move.name}</span>
        <span>${move.email}</span>
        <span>${move.phone}</span>
        <span>${move.enrollnumber}</span>
        <span>${move.dateofadmission}</span>
        <span><button class="btn-table btn-edit" data-id=${move.id}><img src="/btn-edit.87768a19.svg"></button></span>
        <span><button class="btn-table btn-delete btn-table-delete" data-id=${move.id}><img src="/btn-delete.98640746.svg"></button></span>
      </li>`

    return tableRow;
  }
}
