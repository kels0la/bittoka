import React from 'react'
import withAuthorization from '../../components/AuthUserSession/withAuthorization';
import API from '../../utils/API';
import { EditorState, ContentState, convertFromHTML } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import EditorPage from './EditorPage'

class EditorPageContainer extends React.Component {
  constructor(props) {
    super(props)
    const initialCategoryName = this.props.match.params.categoryName || ''

    this.state = {
      editorState: EditorState.createEmpty(),
      tags: [],
      teaser: '',
      title: '',
      categories: [],
      categoryName: initialCategoryName,
      categoryDisplayName: '',
      selectedCategoryName: '',
      selectedTags: [],
      selectedTagObjects: null,
      postId: null,
      author: props.authUser.dbUser._id,
      paywallCost: 0.00,
      isPaywallActive: false
    }
  }

  onEditorChange = editorState => this.setState({ editorState })
  onTitleChange = e => this.setState({ title: e.target.value })
  onTeaserChange = e => this.setState({ teaser: e.target.value })

  setPostSettings = pubModalState => this.setState({ ...pubModalState })

  componentDidMount() {
    const isNewPost = !this.props.match.params.postId
    const categoryData = this.getCategoryMenuData();
    const postData = isNewPost ? this.initialSave() : this.loadPost()

    Promise.all([categoryData, postData])
      .then(([categoryData, postData]) => {
        let categoryDisplayName = postData.categoryName ? categoryData.find(c => c.value === postData.categoryName).value : ''
        let tags = postData.categoryName ? categoryData.find(c => c.value === postData.categoryName).tags : []
        let selectedTagObjects = (postData.tags < 1) ? [] : postData.tags.map(t => {
          return { value: t, label: t, color: 'darkcyan' }
        })

        let isPaywallActive = postData.paywallCost > 0

        this.setState({
          categories: categoryData,
          selectedTags: postData.tags,
          editorState: this.createFromHtml(postData.body),
          title: postData.title,
          teaser: postData.teaser || '',
          isDraft: postData.isDraft,
          paywallCost: postData.paywallCost || 0.00,
          postId: postData._id,
          categoryName: postData.categoryName,
          categoryDisplayName,
          tags,
          selectedTagObjects,
          isPaywallActive
        })
      })
      .catch(err => console.log('componentDidMount getData Error:', err))
  }

  createFromHtml = html => {
    const blocksFromHtml = convertFromHTML(html)
    const state = ContentState.createFromBlockArray(
      blocksFromHtml.contentBlocks,
      blocksFromHtml.entityMap
    )
    return EditorState.createWithContent(state)
  }

  initialSave = () => {
    const data = {
      title: `Untitled ${new Date().toDateString()}`,
      body: 'And so it begins...',
      isDraft: true,
      categoryName: this.props.match.params.categoryName
    }
    return API.createPost(data)
      .then(result => result.data)
      .catch(err => console.log(err))
  };

  loadPost() {
    return API.getPost(this.props.match.params.postId)
      .then(result => result.data)
      .catch(err => {
        console.log('Error Loading Post Data:', err)
      })
  }

  // TODO: Clean this up.  Maybe generate the select obj on the fly or
  // at least closer to where it is actually used.
  getCategoryMenuData = () => {
    return API.getCategoriesTags()
      .then((result) => {
        return result.data.map(category => {
          return {
            value: category.name,
            label: category.displayName,
            tags: category.tags.sort().map(tag => {
              return {
                value: tag,
                label: tag,
                color: "darkcyan"
              }
            })
          }
        })
      }).catch(error => {
        console.log('Error getting Category Data', error);
      });
  };

  saveDraft = (event) => {
    event.preventDefault();
    const { title, selectedTags, teaser, editorState } = this.state
    const body = stateToHTML(editorState.getCurrentContent())

    const data = {
      title: title,
      teaser: teaser,
      body: body,
      tags: selectedTags,
      categoryName: this.state.categoryName,
      isDraft: true,
    };
    API.submitDraft(this.state.postId, data)
      .then(res => console.log('saveDraft response: ', res))
      .catch(err => console.log('saveDraft Err: ', err))
  };

  render() {
    console.log('EditorPageContainer props: ', this.props)
    return (
      <EditorPage
        onEditorChange={this.onEditorChange}
        onTitleChange={this.onTitleChange}
        onTeaserChange={this.onTeaserChange}
        onCategorySelectChange={this.categorySelectChange}
        onTagSelectChange={this.onTagSelectChange}
        setPostSettings={this.setPostSettings}
        saveDraft={this.saveDraft}
        history={this.props.history}
        {...this.state}
      />
    )
  }
}

const authCondition = authUser => !!authUser

export default withAuthorization(authCondition)(EditorPageContainer)