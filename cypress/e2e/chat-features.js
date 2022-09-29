import { dataRecovery } from '../fixtures/test-data-accounts.json'

const faker = require('faker')
const randomPIN = faker.internet.password(7, false, /[A-Z]/, 'test') // generate random PIN
const randomNumber = faker.datatype.number() // generate random number
const randomMessage = faker.lorem.sentence() // generate random sentence
const imageLocalPath = 'cypress/fixtures/images/logo.png'
const recoverySeed =
  dataRecovery.accounts
    .filter((item) => item.description === 'Only Text')
    .map((item) => item.recoverySeed) + '{enter}'
let imageURL

describe('Chat Features Tests', () => {
  before(() => {
    // Save Localstorage Snapshots for next specs
    cy.restoreLocalStorage('Chat User A', 'Chat User B')
  })
  it('Chat - Send message on chat', { retries: 2 }, () => {
    // Import account
    cy.loginWithLocalStorage('Chat User A', '12345')

    // Validate message is sent
    cy.goToNewChat()
    cy.chatFeaturesSendMessage(randomMessage)
  })

  it('Chat - Send Emoji on chat', () => {
    cy.chatFeaturesSendEmoji('[title="smile"]', '😄')
  })

  // Skipped because edit feature is coming soon
  it.skip('Chat - Edit message on chat', () => {
    cy.chatFeaturesEditMessage(randomMessage, randomNumber)
  })

  // Skipped because edit feature is coming soon
  it.skip('Chat - Message edited shows edited status', () => {
    cy.get('[data-cy=message-edited]').last().parents()

    cy.contains(randomMessage + randomNumber)
      .parents('[data-cy=message-container]')
      .find('[data-cy=message-edited]', { timeout: 30000 })
      .should('contain', '(edited)')
  })

  it('Chat - Copy paste text', () => {
    // Allowing Chrome Browser to have read and write access to clipboard
    cy.wrap(
      Cypress.automation('remote:debugger:protocol', {
        command: 'Browser.grantPermissions',
        params: {
          permissions: ['clipboardReadWrite', 'clipboardSanitizedWrite'],
          //make the permission trigger by allowing the current origin only
          origin: window.location.origin,
        },
      }),
    )

    //Ensuring permissions for read were granted
    cy.window()
      .its('navigator.permissions')
      .invoke('query', { name: 'clipboard-read' })
      .its('state')
      .should('equal', 'granted')

    //Copying the latest text message sent
    cy.contains(randomMessage).last().scrollIntoView().rightclick()
    cy.contains('Copy Message').realClick()

    //Validating that text messsage copied matches with actual clipboard value
    cy.window()
      .its('navigator.clipboard')
      .invoke('readText')
      .should('equal', randomMessage)
      .then((clipboardText) => {
        //Simulating the paste event through a cypress command passing the clipboard data
        cy.get('[data-cy=editable-input]').click().paste({
          pasteType: 'text',
          pastePayload: clipboardText,
        })
      })
    // Validating that editable input text matches with pasted value
    cy.get('[data-cy=editable-input]').should('have.text', randomMessage)
    cy.get('[data-cy=editable-input]').click().clear()
  })

  //Skipped because it needs rework - AP-1324
  it.skip('Chat - Copy paste images', () => {
    cy.chatFeaturesSendImage(imageLocalPath, 'logo.png')

    // Copying the latest image URL sent
    cy.goToLastImageOnChat()
      .invoke('attr', 'src')
      .then((imgSrcValue) => {
        imageURL = imgSrcValue
      })
    cy.goToLastImageOnChat().rightclick()
    cy.contains('Copy Image').realClick()

    // Simulating paste event through a cypress command passing the clipboard image URL data
    cy.window()
      .its('navigator.clipboard')
      .invoke('read')
      .then((clipboardImageURL) => {
        cy.get('[data-cy=editable-input]').realClick().paste({
          pasteType: 'url',
          pastePayload: clipboardImageURL,
        })
      })
    // Validating that preview of image is displayed and matches with image filename copied from clipboard
    cy.get('.file-item').should('exist') //seems this is no longer available, test needs to be updated
    cy.get('.file-info > .title').should('contain', 'logo.png')
  })

  it('Chat - Verify when clicking on Send Money, coming soon appears', () => {
    // Hover over on Send Money and Coming Soon tooltip will appear when clicking on its button
    cy.hoverOnComingSoonIcon(
      '[data-cy=send-money]',
      'Send Money Coming Soon',
    ).then(() => {
      cy.contains('Send Money Coming Soon').should('not.exist')
    })
  })

  it('Chat - Verify when clicking on Emoji, the emoji picker appears', () => {
    // Emoji picker is displayed  when clicking on its button
    cy.get('[data-cy=send-emoji]').click()
    cy.contains('Frequently used').should('be.visible')
    cy.get('[data-cy=emoji-picker]').should('be.visible')

    //Click outside to close the emoji picker
    cy.get('body')
      .realClick({ position: 'topLeft' })
      .then(() => {
        cy.get('[data-cy=emoji-picker]').should('not.exist')
      })
  })

  it('Chat - Verify when clicking on Glyphs, the glyphs picker appears', () => {
    // Glyphs picker is displayed when clicking on its button
    cy.get('[data-cy=emoji-picker]').should('not.exist')
    cy.get('[data-cy=send-glyph]').click()
    cy.contains('Try using some glyphs').should('be.visible')
    cy.get('[data-cy=glyphs-picker]').should('be.visible')
    //Click outside to close the glyphs picker
    cy.get('body')
      .realClick({ position: 'topLeft' })
      .then(() => {
        cy.get('[data-cy=glyphs-picker]').should('not.exist')
      })
  })

  it('Chat - Validate User ID can be copied when clicked on it', () => {
    cy.chatFeaturesProfileName()
    cy.contains('ATTN: Copied to clipboard.').should('be.visible')
  })

  //Test is skipped because Profile Screen cannot be accessed now from Main Chat Page
  it.skip('Chat - Add a note to user profile', () => {
    cy.addOrAssertProfileNote('This is a test note' + randomNumber, 'add')
  })

  //Test is skipped because Profile Screen cannot be accessed now from Main Chat Page
  it.skip('Chat - Assert note from user profile', () => {
    cy.addOrAssertProfileNote('This is a test note' + randomNumber, 'assert')
  })

  after(() => {
    // Save Localstorage Snapshots for next specs
    cy.saveLocalStorage('Chat User A', 'Chat User B')
  })
})
