<template>
  <div id="playlist">
    <section id="playlist-view">
      <div id="header">
        <h1>Playlists</h1>
        <a v-on:click="showCreateModal()">+</a>
      </div><!-- #header -->
      <div id="playlist-grid">
        <div class="playlist-element" v-for="(playlist, i) in userPlaylists">
          <img v-bind:id="'playlist-img-' + i" class="playlist-img" v-bind:alt="playlist.name" v-on:click="openPlaylist(playlist)" />
          <a class="playlist-name" v-on:click="openPlaylist(playlist)">{{playlist.name}}</a>

          <button v-on:click="removePlaylist(playlist)"><img src="../assets/delete.png" alt="Delete" /></button>
          <button v-on:click.prevent="showEditModal(playlist)"><img src="../assets/edit.png" alt="Edit" /></button>
        </div><!-- .playlist-element -->
      </div><!-- #playlist-grid -->
    </section><!-- #playlist-view -->

    <playlist-modal
      name="Create Playlist"

      v-bind:playlist="playlist"
      v-bind:currentImage="currentImage"
      v-bind:modalVisible="createModalVisible"
      v-bind:modalError="modalError"

      v-bind:closeModal="closeModal"
      v-bind:playlistAction="createPlaylist"
      v-bind:onFileChange="onFileChange"
    />

    <playlist-modal
      name="Edit Playlist"

      v-bind:playlist="playlist"
      v-bind:currentImage="currentImage"
      v-bind:imageUnchanged="imageUnchanged"
      v-bind:modalVisible="editModalVisible"
      v-bind:modalError="modalError"

      v-bind:closeModal="closeModal"
      v-bind:playlistAction="editPlaylist"
      v-bind:onFileChange="onFileChange"
    />
  </div>
</template>

<script>
import PlaylistModal from './elements/PlaylistModal';
import ImageTools from './helpers/ImageTools';

export default {
  name: 'playlists',
  components: {
    PlaylistModal,
  },
  firebase() {
    return {
      userPlaylists: this.playlistsRef.orderByChild('owner').equalTo(this.firebase.auth().currentUser.uid),
    };
  },
  data() {
    const firebase = this.$root.$data.firebase;
    const firebaseApp = this.$root.$data.firebaseApp;
    const db = firebaseApp.database();

    return {
      firebase,
      firebaseApp,
      playlistsRef: db.ref('playlists'),
      playlistImagesRef: db.ref('playlistImages'),
      playlist: {
        owner: firebase.auth().currentUser.uid,
        name: '',
        description: '',
        imageRef: '',
      },
      currentImage: {},
      imageUnchanged: true,
      createModalVisible: false,
      editModalVisible: false,
      modalError: '',
    };
  },
  mounted() {
    this.playlistsRef
      .orderByChild('owner')
      .equalTo(this.firebase.auth().currentUser.uid)
      .on('value', (playlistsSnapshot) => {
        const playlists = playlistsSnapshot.val();
        if (playlists) {
          const valArray = Object.keys(playlists).map(key => playlists[key]);
          valArray.forEach((val, i) => {
            this.$nextTick(() => {
              const img = document.getElementById(`playlist-img-${i}`);
              this.playlistImagesRef
                .child(val.imageRef)
                .on('value', (playlistImageSnapshot) => {
                  img.src = playlistImageSnapshot.val();
                });
            });
          });
        }
      });
  },
  methods: {
    createPlaylist() {
      if (this.playlist.name.trim() && this.playlist.description.trim() && this.currentImage.name) {
        this.uploadImage(() => {
          this.playlistsRef.push(this.playlist).then(
            () => {
              this.closeModal();
            },
            (err) => {
              // eslint-disable-next-line
              console.error(err);
            },
          );
        });
      } else {
        this.modalError = 'Playlist must have a name, description, and image!';
      }
    },
    editPlaylist() {
      if (this.playlist.name.trim() && this.playlist.description.trim() && this.currentImage.name) {
        const key = this.playlist['.key'];

        if (this.imageUnchanged) {
          this.playlistsRef.child(key).update({
            owner: this.playlist.owner,
            name: this.playlist.name,
            description: this.playlist.description,
          }).then(
            () => this.closeModal(),
            (err) => {
              // eslint-disable-next-line
              console.error(err);
            },
          );
        } else {
          this.uploadImage(() => {
            this.playlistsRef.child(key).update({
              owner: this.playlist.owner,
              name: this.playlist.name,
              description: this.playlist.description,
              imageRef: this.playlist.imageRef,
            }).then(
              () => {
                this.closeModal();
              },
              (err) => {
                // eslint-disable-next-line
                console.error(err);
              },
            );
          });
        }
      } else {
        this.modalError = 'Playlist must have a name, description, and image!';
      }
    },
    removePlaylist(playlist) {
      this.playlistsRef.child(playlist['.key']).remove();
    },
    openPlaylist(playlist) {
      this.$router.push({
        name: 'Playlist-Detail',
        params: {
          id: playlist['.key'],
          name: playlist.name,
        },
      });
    },
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      this.currentImage = files[0];
      this.imageUnchanged = false;
    },
    uploadImage(cb) {
      const pushImage = (img) => {
        this.playlistImagesRef.push(img).then(
          (snapshot) => {
            this.playlist.imageRef = snapshot.key;

            cb();
          },
          (err) => {
            // eslint-disable-next-line
            console.error(err);
          },
        );
      };

      ImageTools.resize(this.currentImage, {
        width: 250,
        height: 250,
      }, (res, success) => {
        if (success) {
          pushImage(res);
        } else {
          const reader = new FileReader();
          reader.addEventListener('load', () => pushImage(reader.result));
          reader.readAsDataURL(this.currentImage);
        }
      });
    },
    showCreateModal() {
      this.createModalVisible = true;
    },
    showEditModal(playlist) {
      this.playlist = playlist;

      this.editModalVisible = true;
    },
    closeModal() {
      this.createModalVisible = false;
      this.editModalVisible = false;
      this.resetForms();
    },
    resetForms() {
      this.playlist = {
        owner: this.firebase.auth().currentUser.uid,
        name: '',
        description: '',
        imageRef: '',
      };

      this.currentImage = {};
      this.imageUnchanged = true;
      this.modalError = '';

      Array.prototype.slice.call(document.forms).forEach(form => form.reset());
    },
  },
};
</script>

<style lang="scss" scoped>
@mixin v-center {
  position: relative;
  top: 50%;
  @include transform(translateY(-50%));
}
#playlist {
  padding-top: 56px;

  #playlist-view {
    margin: 0 auto;

    #header {
      margin-top: 2em;
      padding-bottom: 1em;
      margin-bottom: 1em;
      border-bottom: 1px solid black;

      h1 {
        margin: 0;

        display: inline-block;

        font-family: 'Avenir', Helvetica, sans-serif;

        font-size: 2em;
      }

      a {
          margin: 0;
          float: right;
          font-size: 1.75em;

          padding-right: 5%;


          &:hover {
            color: #76157c;
          }
      }

    }
  }
}

#playlist-grid {
  text-align: center;

  .playlist-element {
    margin: 5px 20px 10px;
    width: 160px;

    vertical-align: top;

    display: inline-block;

    .playlist-img {
      width: 160px;
      height: 160px;

      cursor: pointer;

      box-shadow: 0 2px 4px rgba(0,0,0,.5);
    }

    .playlist-name {
      display: block;

      cursor: pointer;

      font-weight: bold;
      text-transform: uppercase;
    }

    .playlist-name:hover {
      color: #7c7c7c;
    }

    button {
      border: none;
      background: none;

      img {
        width: 16px;
        height: 16px;
      }
    }

    a {
      font-family: 'Avenir', Helvetica, sans-serif;
    }
    button {
      visibility: hidden;
    }

    &:hover {
      button {
        visibility: initial;
         opacity: 0.5;

         &:hover {
            opacity: 1;
         }
      }
      
    }
  }
}

@media (min-width: 701px) {
  #playlist-view {
    width: 60%;
  }

}

@media screen and (max-width: 700px) {
  #playlist-view {
    width: 90%;
  }

  #playlist-grid .playlist-element button {
    visibility: visible;
    opacity: 0.5;
  }


}
</style>
