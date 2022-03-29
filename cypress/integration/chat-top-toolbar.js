const faker = require('faker')
const randomPIN = faker.internet.password(7, false, /[A-Z]/, 'test') // generate random PIN
const recoverySeed =
  'veteran intact there despair unique trouble season rebel sort file unit hard{enter}'

describe('Chat Toolbar Tests', () => {
  before(() => {
    //Import account
    cy.importAccount(randomPIN, recoverySeed)

    //Ensure messages are displayed before starting
    cy.contains('cypress', { timeout: 180000 }).should('be.visible')
    cy.get('.toggle-sidebar').should('be.visible').click()
    cy.waitForMessagesToLoad()
  })

  it('Chat - Toolbar - Validate audio icon is displayed', () => {
    cy.hoverOnActiveIcon('[data-cy=toolbar-enable-audio]')
  })

  it('Chat - Toolbar - Validate video icon is displayed', () => {
    cy.hoverOnActiveIcon('[data-cy=toolbar-enable-video]')
  })

  it('Chat - Toolbar - Alerts icon shows Coming Soon', () => {
    cy.get('[data-cy=toolbar-alerts]').should('be.visible')
    cy.hoverOnComingSoonIcon(
      '[data-cy=toolbar-alerts] > .tooltip-container',
      'Alerts\nComing Soon',
    )
  })

  it('Chat - Toolbar - Archived Messages icon shows Coming Soon', () => {
    cy.get('[data-cy=toolbar-archived-messages]').should('be.visible')
    cy.hoverOnComingSoonIcon(
      '[data-cy=toolbar-archived-messages] > .tooltip-container',
      'Archived Messages\nComing Soon',
    )
  })

  it('Chat - Toolbar - Marketplace icon is displayed', () => {
    cy.get('[data-cy=toolbar-marketplace]').should('be.visible')
    cy.hoverOnComingSoonIcon('[data-cy=toolbar-marketplace]', 'Marketplace')
  })

  it('Chat - Toolbar - Wallet icon shows Coming Soon', () => {
    cy.get('[data-cy=toolbar-wallet]').should('be.visible')
    cy.hoverOnComingSoonIcon(
      '[data-cy=toolbar-wallet] > .tooltip-container',
      'Wallet\nComing Soon',
    )
  })

  it('Chat - Marketplace - Coming Soon modal content is correct', () => {
    cy.get('[data-cy=toolbar-marketplace]').click()
    cy.validateComingSoonModal()
  })

  it('Chat - Marketplace - Coming Soon modal button has correct URL', () => {
    cy.validateURLComingSoonModal()
  })

  it('Chat - Marketplace - Coming Soon modal can be dismissed', () => {
    cy.closeModal('[data-cy=modal-cta]')
  })

  it('Chat - Glyph Pack screen is displayed', () => {
    cy.chatFeaturesSendGlyph()
    cy.goToLastGlyphOnChat().click()
    cy.validateGlyphsModal()
  })

  it('Chat - Glyph Pack - Coming Soon modal', () => {
    cy.contains('View Glyph Pack').click()
    cy.get('[data-cy=modal-cta]').should('be.visible')
    cy.closeModal('[data-cy=modal-cta]')
  })

  it('Chat - Glyph Pack screen can be dismissed', () => {
    cy.goToLastGlyphOnChat().click()
    cy.get('[data-cy=glyphs-modal]').should('be.visible')
    cy.closeModal('[data-cy=glyphs-modal]')
  })

  it('Chat - Glyphs Selection - Coming soon modal', () => {
    cy.get('#glyph-toggle').click()
    cy.get('[data-cy=glyphs-marketplace]').click()
    cy.get('[data-cy=modal-cta]').should('be.visible')
    cy.closeModal('[data-cy=modal-cta]')
  })
})
