interface UIState {
  contextMenuStatus: Boolean
  contextMenuValues: Array<Object>
  quickProfile: Object | Boolean
  contextMenuPosition: Object
  quickProfilePosition: Object
  showSidebarUsers: Boolean
  modals: Object
}

const InitalUIState: UIState = {
  contextMenuStatus: false,
  showSidebarUsers: true,
  quickProfile: false,
  contextMenuValues: [],
  contextMenuPosition: { x: 0, y: 0 },
  quickProfilePosition: { x: 0, y: 0 },
  modals: {
    newfolder: false
  }
}

export default InitalUIState
