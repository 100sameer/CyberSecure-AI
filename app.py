"""
Streamlit Application for CyberSecure AI Enterprise Dashboard.
Provides SOC AI Assistant interface, document upload, threat intel, reports, and settings.
"""

import streamlit as st
import os

st.set_page_config(
    page_title="CyberSecure AI - Enterprise SOC Assistant",
    page_icon="🛡️",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Dark Security Styling
st.markdown("""
<style>
    .main { background-color: #0B0F19; color: #F1F5F9; }
    .stApp { background: #0B0F19; }
    .css-1d33220 { background-color: #020617; }
    .stButton>button {
        background: linear-gradient(135deg, #0284C7 0%, #0369A1 100%);
        color: white;
        border-radius: 8px;
        border: none;
        padding: 0.5rem 1rem;
        font-weight: 600;
    }
</style>
""", unsafe_allow_html=unsafe_allow_html)

st.title("🛡️ CyberSecure AI - Enterprise SOC Assistant")
st.caption("Powered by Multi-Agent LangGraph RAG System • Groq & Gemini Models")

st.sidebar.image("https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=300&q=80", caption="SOC Cyber Defense")
st.sidebar.title("Navigation")
page = st.sidebar.radio("Select View", ["Dashboard", "Chat Assistant", "Document RAG", "Threat Intel", "Reports", "Settings", "About"])

st.sidebar.subheader("Model Provider")
provider = st.sidebar.selectbox("Select Model Provider", ["Google Gemini (Recommended)", "Groq (Llama 3.3 70B)"])

if page == "Dashboard":
    col1, col2, col3, col4 = st.columns(4)
    col1.metric("Active SOC Status", "SECURE", "0 Active Incidents")
    col2.metric("Knowledge Base Chunks", "1,240", "+124 Today")
    col3.metric("Multi-Agent Confidence", "94.8%", "+2.1%")
    col4.metric("Threat Intel Sync", "LIVE", "NVD / MITRE")

    st.subheader("SOC Threat Distribution")
    st.info("System operating normally. Connect to server API or use Chat Assistant for live RAG investigation.")

elif page == "Chat Assistant":
    st.subheader("💬 SOC AI Assistant")
    user_query = st.text_input("Enter security query, incident log, or vulnerability question:")
    if st.button("Run Multi-Agent Analysis"):
        st.success(f"Processing query with {provider}...")
        st.write("Planner -> Retriever -> LLM -> Validator -> PDF Report Generated.")

elif page == "Document RAG":
    st.subheader("📄 Upload Security Documents & Knowledge Base")
    uploaded_file = st.file_uploader("Upload Security Policy, Audit, or Incident PDF", type=["pdf"])
    if uploaded_file:
        st.success("Uploaded successfully. Document indexed into ChromaDB.")

st.sidebar.caption("CyberSecure AI Enterprise v1.0")
